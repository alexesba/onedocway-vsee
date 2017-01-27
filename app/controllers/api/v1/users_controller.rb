class Api::V1::UsersController < Api::V1::ApplicationController
  def index
    render json: User.all, each_serializer: UserSerializer
  end
end
