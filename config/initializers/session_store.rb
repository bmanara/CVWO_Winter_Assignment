if Rails.env === 'production'
  Rails.application.config.session_store :cookie_store, key: 'CVWO_web_forum',
                                                        domain: 'CVWO_web_forum-json-api'
else
  Rails.application.config.session_store :cookie_store, key:'CVWO_web_forum'
end
