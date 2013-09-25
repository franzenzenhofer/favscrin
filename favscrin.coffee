_DEBUG_ = false
SIZE = 32

_scroll_listener_is_set_ = false

dlog = (msg, var_name, debug = _DEBUG_) ->
  until debug then return msg
  if var_name
    console.log("#{ var_name }: #{ msg }")
  else
    console.log(msg)
  return msg


favicon_canvas = document.createElement('canvas')
favicon_canvas.width = SIZE
favicon_canvas.height = SIZE
favicon_canvas_context = favicon_canvas.getContext('2d')

#favicon = document.createElement('image')
#favicon.width = SIZE
#favicon.height = SIZE
#favicon.src = favicon_canvas.toDataURL()

#<link id="favicon" rel="icon" type="image/png" href="" />
favicon_link_element = document.createElement('link')
favicon_link_element.setAttribute('rel', 'icon')
favicon_link_element.setAttribute('type', 'image/png')
favicon_link_element.setAttribute('href', '')

document.head.appendChild(favicon_link_element)

drawBackground = (color) ->
  favicon_canvas_context.fillStyle = color
  favicon_canvas_context.fillRect(0, 0, SIZE, SIZE)

drawIndicator = (ratio=0, color) ->
  dlog(ratio, 'ratio')
  favicon_canvas_context.fillStyle = color
  down_pos = Math.ceil(SIZE*ratio)
  dlog(down_pos,'down_pos')
  #new_size = SIZE-down_pos
  favicon_canvas_context.fillRect(0, down_pos, SIZE, SIZE)


favscrin = (background_color = '#FF8000', indicator_color='#31B404', letter = 'E', letter_color = '#ffffff') ->
  doc = document.documentElement
  body = document.body
  
  viewport_height = dlog(window.innerHeight, 'viewport_height')

  current_scroll_bottom = dlog((doc?.scrollTop or body?.scrollTop or 0), 'current_scroll_bottom')
  
  body_height = dlog(window.document.height, 'body_height')

  scrolled_ratio = dlog(current_scroll_bottom/(body_height-viewport_height), 'scrolled_ratio') 

  #draw favicon canvas
  dlog(background_color, 'background_color')
  drawBackground(background_color)
  dlog(indicator_color, 'indicator_color')
  drawIndicator(scrolled_ratio, indicator_color)

  favicon_canvas_context.font = '29pt Arial';
  favicon_canvas_context.textAlign = 'center';
  favicon_canvas_context.fillStyle = letter_color;
  favicon_canvas_context.fillText(letter, 15, 30);


  #transform the favicon to the image
  #favicon.src = favicon_canvas.toDataURL()

  #set favicon
  favicon_link_element.setAttribute('href', favicon_canvas.toDataURL())

  #if no onscroll event handler is set, set one
  until _scroll_listener_is_set_ 
    window.addEventListener('scroll', (()->favscrin(background_color, indicator_color, letter, letter_color)))
    _scroll_listener_is_set_ = true

#console.log('loaded')

window.favscrin = favscrin
#do favscrin





