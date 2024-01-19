class Api::V1::PostsController < ApplicationController
  before_action :set_post, only: %i[ show update destroy ]

  # GET /posts
  def index
    @posts = Post.select("posts.*, users.username").joins(:user).order(created_at: :desc)

    render json: @posts
  end

  # GET /posts/1
  def show
    @comments = Comment.select("comments.*, users.username")
                       .joins(:user, :post)
                       .where('post_id = ?', "#{@post.id}")
                       .order(created_at: :desc)
    @category = Post.select("categories.name, categories.description")
                        .joins(:category)
                        .where('posts.id = ?', "#{@post.id}")
    render json: {
      username: @post.user.username,
      comments: @comments,
      post: @post,
      category: @category
    }
  end

  # POST /posts
  def create
    @post = Post.new(post_params)

    if @post.save
      render json: @post, status: :created, location: api_v1_post_url(@post)
    else
      render json: @post.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /posts/1
  def update
    if @post.update(post_params)
      render json: @post
    else
      render json: @post.errors, status: :unprocessable_entity
    end
  end

  # DELETE /posts/1
  def destroy
    @post.destroy!
  end

  #search /posts/search?q=query
  def search
    @posts = Post.joins(:category).where("name = ?", "#{params[:q]}");
    render json: @posts
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_post
      @post = Post.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def post_params
      params.require(:post).permit(:title, :body, :user_id, :category_id)
    end
end
