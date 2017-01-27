class VseeService
  include HTTParty

  base_uri "https://api.vsee.com/"
  debug_output $stdout

  def initialize
    @api_key = ENV['VSEE_KEY']
    @api_secret = ENV['VSEE_SECRET']
    @headers = { 'Content-Type' => 'application/json' }
  end

  def create_user(user_params={})
    self.class.post("/user/create", build_params(user_params) )
  end

	def call(user_commands={})
		self.class.post("/uri/create", build_params(user_commands) )
	end

  def build_params(body_params)
   {   headers: @headers, body: body_params.merge(secretkey: @api_secret).to_json, query: { apikey: @api_key } }
  end

  def find_or_create_by(user_params)
    user = User.find_by(username: user_params[:username])
    if (!user.password)
      password = SecureRandom.hex
      response = create_user(user_params.merge(fn: user.fn, ln: user.ln, password: password))
      if response["status"] == "success"
        user.update_attribute(:password, password)
      else
        user = response
      end
    end
    user
  end

end
