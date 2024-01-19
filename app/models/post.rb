class Post < ApplicationRecord
  validates :body, :title, :user_id, presence: true

  has_many :comments, dependent: :destroy
  belongs_to :user
  belongs_to :category
end
