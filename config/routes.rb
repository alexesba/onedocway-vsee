Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root :to => "app#index"
  get '/app', to: "app#index"
  get '/app/*', to: 'app#index', as: :react_app
  namespace :api do
    api_version module: 'v1', path: { value: 'v1' } do
      resources :users, only: :index
      resource :vsees, only: [:create] do
        post :uri
      end
    end
  end
end
