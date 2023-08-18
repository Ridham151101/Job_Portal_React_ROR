class Api::V1::ProfilesController < ApplicationController
  def update
    if current_user.update(profile_params)
      render json: {
        status: { 
          code: 200, message: 'Profile updated successfully.',
          data: {
            user: {
              name: current_user.name,
              email: current_user.email,
              gender: current_user.gender
            }
          }
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
