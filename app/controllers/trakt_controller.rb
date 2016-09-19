class TraktController < ApplicationController
  def authenticate
    auth_endpoint = "#{ENV['TRAKT_API_ENDPOINT']}/oauth/authorize"
    client_id = ENV['TRAKT_CLIENT_ID']
    redirect_uri = URI.encode("#{ENV['TRAKT_REDIRECT_URI']}")
    auth_uri = "#{auth_endpoint}?response_type=code&client_id=#{client_id}&redirect_uri=#{redirect_uri}"
    redirect_to auth_uri
  end

  # trakt sign-in callback
  def code
    @code = params[:code]
    token_info = token(@code)
    cookies[:token] = {
      value: JSON.parse(token_info)['access_token'],
      expires: 3.months.from_now
    }
    redirect_to '/#/lab/trakt'
  end

  def token(code)
    token_endpoint = "#{ENV['TRAKT_API_ENDPOINT']}/oauth/token"
    payload = {
      code: code,
      client_id: ENV['TRAKT_CLIENT_ID'],
      client_secret: ENV['TRAKT_CLIENT_SECRET'],
      redirect_uri: URI.encode("#{ENV['TRAKT_REDIRECT_URI']}"),
      grant_type: 'authorization_code'
    }.to_json
    begin
      resp = RestClient.post token_endpoint, payload,{content_type: 'application/json'}
      return resp
    rescue e
      redirect_to '/authenticate'
    end
  end

  def shows
    @shows = get_shows
    render json: @shows
  end

  def get_shows
    mh_header = {
      content_type: 'application/json',
      'trakt-api-version': 2,
      'trakt-api-key': ENV['TRAKT_CLIENT_ID']
    }
    mh_header.merge! 'Authorization': "Bearer #{cookies[:token]}" if cookies[:token].present?
    user_id = cookies[:token].nil? ? 'itsmatthu' : 'me'
    user_endpoint = "#{ENV['TRAKT_API_ENDPOINT']}/users/#{user_id}/watched/shows"
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
      'trakt-api-key': ENV['TRAKT_CLIENT_ID']
    }
    show_index_endpoint = "#{ENV['TRAKT_API_ENDPOINT']}/shows/#{id}#{extended}"
    resp = RestClient.get show_index_endpoint, mh_header
    return resp
  end
end
