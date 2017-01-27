class UserSerializer < ActiveModel::Serializer
  attributes :id, :username, :display_name

  def display_name
    "#{object.username} - #{object.first_name} #{object.last_name}"
  end
end
