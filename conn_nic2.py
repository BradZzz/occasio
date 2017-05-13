import socket, ssl

#client = EppClient(ssl_keyfile='occasio.key', ssl_certfile='cacert.pem', ssl_cacerts='root.pem')

sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
sock.settimeout(120)  # regular timeout

sock = ssl.wrap_socket(sock, keyfile="occasio.key", certfile="cacert.pem",
                       server_side=True,
                       cert_reqs=ssl.CERT_REQUIRED,
                       ca_certs="/home/bitnami/occasio/python2713/lib/python2.7/site-packages/certifi/cacert.pem")

def handle(conn):
  conn.write(b'GET / HTTP/1.1\n')
  print conn.recv()

def hello(conn):
  hello = """
            <?xml version="1.0" encoding="UTF-8" standalone="no"?>
            <epp xmlns="urn:ietf:params:xml:ns:epp-1.0">
              <hello/>
            </epp>
          """

  print hello
  conn.send(hello)
  print conn.recv()
  print "\n"

def login(conn):
  login_com = """
     <?xml version="1.0" encoding="UTF-8" standalone="no"?>
     <epp xmlns="urn:ietf:params:xml:ns:epp-1.0">
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
              <objURI>urn:ietf:params:xml:ns:secDNS-1.1</objURI>
            </svcs>
          </login>
          <clTRID>1xl2gXUrXDbb</clTRID>
        </command>
     </epp>
  """
  print login_com
  conn.send(login_com)
  print conn.recv()
  print "\n"

try:
  #conn.connect((HOST, PORT))
  sock.connect(('ote.nic.io', 700))
  handle(sock)
finally:
  sock.close()

#
# login()
# hello()
#
# sock.close()
