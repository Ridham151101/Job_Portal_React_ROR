Rails.application.routes.draw do
  devise_for :users, path: '', path_names: {
    sign_in: 'login',
    sign_out: 'logout',
    registration: 'signup'
  },
  controllers: {
    sessions: 'users/sessions',
    registrations: 'users/registrations'
  }

  namespace :api do
    namespace :v1 do
      resource :profile, only: [:update]
      resources :portfolios, only: [:index, :create, :show, :update, :destroy]
      resources :companies, only: [:index, :show, :create, :update, :destroy]
    end
  end
end
