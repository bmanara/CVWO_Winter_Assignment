class Api::V1::CategoriesController < ApplicationController

  # GET /posts
  def index
    @categories = Category.all
    if @categories
      render json: @categories
    else
      render json: {
        status: 500,
        errors: ['No categories found']
      }
    end
  end

end
