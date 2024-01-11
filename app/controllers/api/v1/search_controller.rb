class Api::V1::SearchController < ApplicationController
  def posts
    @posts = Post.select("posts.*, users.username")
                 .joins(:user)
                 .where('title ILIKE ? OR body ILIKE ?', "%#{params[:q]}%", "%#{params[:q]}&")
                 .order(created_at: :desc)

    render json: @posts
  end
end
