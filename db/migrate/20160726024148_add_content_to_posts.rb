class AddContentToPosts < ActiveRecord::Migration[5.0]
  def change
    add_column :posts, :category, :string
    add_column :posts, :content, :string
    add_column :posts, :privacy, :string
    add_column :posts, :tags, :string
  end
end
