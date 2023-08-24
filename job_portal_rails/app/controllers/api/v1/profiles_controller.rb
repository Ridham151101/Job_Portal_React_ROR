class Api::V1::ProfilesController < ApplicationController
  def update
    if current_user.update(profile_params)
      render json: {
        status: {code: 200, message: 'Logged in successfully.'},
      data: { 
        user: UserSerializer.new(current_user).serializable_hash[:data][:attributes]
      }
    }, status: :ok
    else
      render json: { errors: current_user.errors }, status: :unprocessable_entity
    end
  end

  private

  def profile_params
    params.require(:user).permit(:name, :email, :gender)
  end
end
