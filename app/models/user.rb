class User < ApplicationRecord
  has_secure_password
  validates :username, presence: true
  validates :username, uniqueness: true
  validates :username, length: { minimum: 4 }

  has_many :posts, dependent: :destroy
  has_many :comments, dependent: :destroy
end
