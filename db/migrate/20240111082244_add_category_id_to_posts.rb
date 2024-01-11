class AddCategoryIdToPosts < ActiveRecord::Migration[7.1]
  def change
    add_reference :posts, :category, index: true
    add_foreign_key :posts, :categories
  end
end
