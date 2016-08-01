Rails.application.routes.draw do
  devise_for :users
  root 'welcome#index'

  resources :posts do
    resources :comments, only: [:show, :create] do
      member do
        put '/upvote' => 'comments#upvote'
      end
    end

    member do
      put '/upvote' => 'posts#upvote'
    end
  end

  get '/cseshow' => 'posts#hq_cse_show'
  post '/cse' => 'posts#hq_cse_tester'

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
