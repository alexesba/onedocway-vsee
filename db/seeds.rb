# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
if User.count == 0
  (1...5).each do |n|
    User.create(username: "patient#{n}", fn: FFaker::Name.first_name, ln: FFaker::Name.last_name);
    User.create(username: "physician#{n}", fn: FFaker::Name.first_name, ln: FFaker::Name.last_name);
  end
end
