class TraktController < ApplicationController
  def authenticate
    auth_endpoint = "https://api.trakt.tv/oauth/authorize"
    client_id = "43927bb1ce06ad8fc60f3b2d8ae666e74358895313952d548d0511725454acf7"
    redirect_uri = URI.encode 'http://localhost:3000/trakt/code'
    auth_uri = "#{auth_endpoint}?response_type=code&client_id=#{client_id}&redirect_uri=#{redirect_uri}"
    redirect_to auth_uri
  end

  def code
    @code = params[:code]
    token_info = token(@code)
    cookies[:token] = {value: JSON.parse(token_info)['access_token'], expires: 10.hour.from_now}
    render plain: token_info
  end

  def token(code)
    token_endpoint = 'https://api.trakt.tv/oauth/token'
    client_id = '43927bb1ce06ad8fc60f3b2d8ae666e74358895313952d548d0511725454acf7'
    client_secret = '8dbf45ee6e81d290d0ffc261a240815f398a3fa74b41e9ec80cc3cecaa5c26ea'
    payload = {
      code: code,
      client_id: client_id,
      client_secret: client_secret,
      redirect_uri: URI.encode('http://localhost:3000/trakt/code'),
      grant_type: 'authorization_code'
    }.to_json
    resp = RestClient.post token_endpoint, payload,{content_type: 'application/json'}
    return resp
  end

  def shows
    @shows = get_shows
    render json: @shows
  end

  def get_shows
    puts 'start---->'
    mh_header = {
      'trakt-api-version': 2,
      content_type: 'application/json',
      'trakt-api-key': '43927bb1ce06ad8fc60f3b2d8ae666e74358895313952d548d0511725454acf7',
      'Authorization': "Bearer #{cookies[:token]}"
    }
    user_endpoint = 'https://api.trakt.tv/users/me/watched/shows'
    resp = RestClient.get user_endpoint, mh_header
    shows = JSON.parse(resp)
    return shows
  end

  def show
    show = fetch_show(params[:id], params[:extended])
    render json: show
  end

  def fetch_show(id, extended)
    extended = extended.nil? ? '' : ('?extended=' + extended)
    mh_header = {
      content_type: 'application/json',
      'trakt-api-version': 2,
      'trakt-api-key': '43927bb1ce06ad8fc60f3b2d8ae666e74358895313952d548d0511725454acf7'
    }
    show_index_endpoint = "https://api.trakt.tv/shows/#{id}#{extended}"
    resp = RestClient.get show_index_endpoint, mh_header
    return resp
  end
end
