class Api::V1::VseesController < Api::V1::ApplicationController
  before_action :find_users, only: :uri
  def uri
    render json: vsee_service.call({
      uris: [
        [
          {
            init: {
              commands: [
                { "setUser" =>  { password: @from.password, username: "genoa+#{@from.username}" } }
              ]
            }
          },
          {"startCall"=>{ username: "genoa+#{@to.username}"} }
        ]
      ]
    })
  end

  def create
    user = vsee_service.find_or_create_by(user_params)
    if user.is_a?(User)
      render json: user, status: 200
    else
      render json: user, status: :bad_request
    end
  end

  def vsee_service
    @vsee_service ||= VseeService.new
  end

  def find_users
    @from = User.find_by(username: params[:from][:username]);
    @to = User.find_by(username: params[:to][:username]);
  end

  def user_params
    params.require(:user).permit(
      :username, :password,
      :fn, :ln,
      :first_name, :last_name
    )
  end

end
