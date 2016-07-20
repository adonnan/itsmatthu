class PostsController < ApplicationController
  before_filter :authenticate_user!, only: [:create, :upvote]
  @@events = []

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
    payload = request.body.read
    @@events << payload
    render nothing: true
  end

  def hq_cse_show
    puts @@events
    render json: @@events
  end

  private

  def post_params
    params.require(:post).permit(:link, :title)
  end
end