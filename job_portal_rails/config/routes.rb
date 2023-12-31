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
      resources :companies, only: [:index, :show, :create, :update, :destroy] do
        resources :reviews, only: [:index, :create]
        resources :jobs, only: [:index, :show, :create, :update, :destroy] do
          get :job_applicants, on: :member
          resources :job_applications, only: [:index, :create]
        end
      end
      get '/open_jobs', to: 'jobs#open_jobs'
      get '/job_applications', to: 'job_applications#current_user_job_applications'
    end
  end
end
