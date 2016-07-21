require 'cse_ruby_sdk'
class PostsController < ApplicationController
  before_filter :authenticate_user!, only: [:create, :upvote]
  @@events = ''
  @@header = ''

  def index
    respond_with Post.all
  end

  def create
    respond_with Post.create(post_params.merge(user_id: current_user.id))
  end

  def show
    respond_with Post.find(params[:id])
  end

  def upvote
    post = Post.find(params[:id])
    post.increment!(:upvotes)

    respond_with post
  end

  def hq_cse_tester
    puts "#1",request.inspect
    payload = request.body.read
    puts '#2'
    h = request.headers
    @@header =+ ("**********"+h.to_s)
    @@events =+ ("@@@@@@@@@@"+payload.to_s)
    puts '#3'
    events = CSE::Packer.unpack_events(payload)
    puts "------header------"
    puts h.inspect
    puts "-------body-------"
    puts events.inspect
    render nothing: true
  end

  def hq_cse_show
    if params[:header].present?
      render json: @@header
    else
      render json: @@events
    end
  end

  private

  def post_params
    params.require(:post).permit(:link, :title)
  end
end
