Rails.application.routes.draw do
  # API Routes will go to /api/v1
  namespace :api do
    namespace :v1 do
      resources :posts
      resources :categories, only: [:index]
      resources :users, only: [:create, :show, :index, :destroy] do
        resources :items, only: [:create, :show, :index, :destroy]
      end
      resources :comments, only: [:create, :destroy]

      get '/search',     to: 'posts#search'
      post '/login',     to: 'sessions#create'
      post '/logout',    to: 'session#destroy'
      post '/logged_in', to: 'sessions#is_logged_in?'
    end
  end

  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check

  # Defines the root path route ("/")
  # root "posts#index"
end
