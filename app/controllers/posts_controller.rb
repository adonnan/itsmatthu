require 'cse_ruby_sdk'
class PostsController < ApplicationController
  # before_filter :authenticate_user!, only: [:create, :update, :upvote, :destroy]
  # before_action :authenticate_admin!, only: [:create, :update, :destroy]
  # @@events = ''
  # @@header = ''

  def index
    respond_with Post.all
  end

  def create
    respond_with Post.create(post_params)
  end

  def show
    post = Post.find(params[:id])
    respond_with post
  end

  def update
    post = Post.find(params[:id])
    post.update!(post_params)
    respond_with post
  end

  def destroy
    post = Post.find(params[:id])
    post.destroy!
  end

  def upvote
    post = Post.find(params[:id])
    post.increment!(:upvotes)

    respond_with post
  end

  # def hq_cse_tester
  #   # puts "#1",request.inspect
  #   payload = request.body.read
  #   # puts '#2'
  #   # h = request.headers
  #   # @@header =+ ("**********"+h.to_s)
  #   # @@events =+ ("@@@@@@@@@@"+payload.to_s)
  #   puts '-----start-----'
  #   events = CSE::Packer.unpack_events(payload)
  #   puts events.inspect
  #   puts "------end------"
  #   render nothing: true, status: 200
  # end
  #
  # def hq_cse_show
  #   if params[:header].present?
  #     render json: @@header
  #   else
  #     render json: @@events
  #   end
  # end

  private

  def post_params
    params.require(:post).permit(:link, :title, :tags, :category, :privacy, :content)
  end

  def authenticate_admin!
    # current_user.role == 'admin'
  end
end
