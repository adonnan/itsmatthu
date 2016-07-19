Rails.application.routes.draw do
  devise_for :users
  root 'welcome#index'

  resources :posts, only: [:create, :index, :show] do
    resources :comments, only: [:show, :create] do
      member do
        put '/upvote' => 'comments#upvote'
      end
    end

    member do
      put '/upvote' => 'posts#upvote'
    end
  end

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
