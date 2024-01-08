class Post < ApplicationRecord
  validates :body, :title, :user_id, presence: true

  belongs_to :user
end
