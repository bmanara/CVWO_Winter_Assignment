# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Example:
#
#   ["Action", "Comedy", "Drama", "Horror"].each do |genre_name|
#     MovieGenre.find_or_create_by!(name: genre_name)
#   end


Post.destroy_all
Category.destroy_all

User.create(
  username: "guestUser",
  password: "12345"
)

# Create 20 posts by using 'faker' gem. (Testing purposes)
# Might not work, from testing
20.times do
  Post.create(
    title: Faker::Lorem.sentence(word_count: 3),
    body: Faker::Lorem.paragraph(sentence_count: 3),
    user_id: 1
  )
end

Category.create(
  name: "Discussions",
  description: "Discuss and debate about any and all topics!"
)

Category.create(
  name: "Questions",
  description: "Have a question you need the answer to? Ask here!"
)

Category.create(
  name: "Ideas",
  description: "Don't know whether your idea is good or looking for honest feedback? Post it here!"
)

Category.create(
  name: "Events",
  description: "Holding an event? Raise awareness of it here!"
)

Category.create(
  name: "Issues",
  description: "Talk about current issues happening around the world here!"
)
