class ApplicationController < ActionController::API
  before_action :configure_permitted_parameters, if: :devise_controller?
  before_action :authenticate_user!

  rescue_from CanCan::AccessDenied do |exception|
    render json: { error: "You are not authorized to perform this action." }, status: :forbidden
  end

  protected

  def configure_permitted_parameters
    devise_parameter_sanitizer.permit(:sign_up, keys: %i[name gender])
    devise_parameter_sanitizer.permit(:account_update, keys: %i[name gender])
  end
end
