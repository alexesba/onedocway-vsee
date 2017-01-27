class User < ApplicationRecord
  alias_attribute :fn, :first_name
  alias_attribute :ln, :last_name
end
