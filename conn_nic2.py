import socket, ssl

#client = EppClient(ssl_keyfile='occasio.key', ssl_certfile='cacert.pem', ssl_cacerts='root.pem')

sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
sock.settimeout(60)  # regular timeout

sock = ssl.wrap_socket(sock, keyfile="occasio.key", certfile="cacert.pem",
                       server_side=False,
                       cert_reqs=ssl.CERT_REQUIRED,
                       ca_certs="/home/bitnami/occasio/python2713/lib/python2.7/site-packages/certifi/cacert.pem")

sock.connect(('ote.nic.io', 700))

login_com = """ <epp xmlns="urn:ietf:params:xml:ns:epp-1.0">
                  <command>
                    <login>
                      <clID>NIC-1253</clID>
                      <pw>.[&lt;2&amp;q'xKn9NMdD:</pw>
                    <options>
                      <version>1.0</version>
                      <lang>en</lang>
                    </options>
                    <svcs>
                      <objURI>urn:ietf:params:xml:ns:domain-1.0</objURI>
                      <objURI>urn:ietf:params:xml:ns:contact-1.0</objURI>
                      <objURI>urn:ietf:params:xml:ns:host-1.0</objURI>
                    </svcs>
                    </login>
                       <clTRID>1xl2gXUrXDbb</clTRID>
                  </command>
               </epp>
            """

sock.send(login_com)
print sock.recv(1280)
sock.close()
