class AddUserIdToPosts < ActiveRecord::Migration[7.1]
  def change
    add_reference :posts, :user, index: true
    add_foreign_key :posts, :users
  end
end
