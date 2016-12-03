wifi.sta.config("ssid","password")
wifi.sta.connect()
wifi.sta.autoconnect(1)

id = 0
tmr.alarm(id, 1000, 1, function() 
    if wifi.sta.getip() ~= nil then
        tmr.stop(id)
        print(wifi.sta.getip())
        socket = net.createConnection(net.TCP, 0)
        socket:connect("port", "ip")
        socket:on("connection", function(sck) 
            uart.on("data", "r", 
              function(data)
                sck:send(data)    
            end, 0)
        end)    
    end
end)