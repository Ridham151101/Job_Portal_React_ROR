# frozen_string_literal: true

class Users::RegistrationsController < Devise::RegistrationsController
  include RackSessionsFix
  respond_to :json

  skip_before_action :authenticate_user

  # POST /resource
  def create
    build_resource(sign_up_params)

    # Assign role based on the 'role' parameter in the request
    resource.add_role(params[:user][:role]) if params[:user][:role]

    resource.save!
    respond_with(resource, _opts = {})
  end

  private

  def respond_with(resource, _opts = {})
    if resource.persisted?
      render json: {
        status: { code: 200, message: 'Signed up successfully.' },
        data: UserSerializer.new(resource).serializable_hash[:data][:attributes]
      }
    else
      render json: {
        status: { message: "User couldn't be created successfully. #{resource.errors.full_messages.to_sentence}" }
      }, status: :unprocessable_entity
    end
  end

  def sign_up_params
    params.require(:user).permit(:email, :password, :password_confirmation, :name, :gender)
  end
end
