class Api::V1::UsersController < ApplicationController

  # GET /users
  def index
    @users = User.all
    if @users
      render json: {
        users: @users
      }
    else
      render json: {
        status: 500,
        errors: ['No users found']
      }
    end
  end

  # GET /users/1
  def show
    @user = User.find(params[:id])
    if @user
      render json: {
        user: @user
      }
    else
      render json: {
        status: 500,
        errors: ['User not found']
      }
    end
  end

  # POST /users
  def create
    @user = User.new(user_params)
    if @user.save
      login!
      render json: {
        status: :created,
        user: @user
      }
    else
      render json: {
        status: 500,
        errors: @user.errors.full_messages
      }
    end
  end

  # DELETE /users/1
  def destroy
    @user.destroy!
  end

  private

  def user_params
    params.require(:user).permit(:username, :password, :password_confirmation)
  end

end
