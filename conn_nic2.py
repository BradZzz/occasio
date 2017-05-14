import socket, ssl, struct

#client = EppClient(ssl_keyfile='occasio.key', ssl_certfile='cacert.pem', ssl_cacerts='root.pem')

clID = "NIC-1253"
clTRID = "abcde12345"
pw = ".[&lt;2&amp;q'xKn9NMdD:"
testDomain = "testing-occas.io"
years = "2"

sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
sock.settimeout(60)  # regular timeout

sock = ssl.wrap_socket(sock, keyfile="occasio.key", certfile="cacert.pem",
                       server_side=True,
                       cert_reqs=ssl.CERT_REQUIRED,
                       ca_certs="/home/bitnami/occasio/python2713/lib/python2.7/site-packages/certifi/cacert.pem")

def handle(conn):
  conn.write(b'GET / HTTP/1.1\n')
  print receive(conn)
  print "\n"

def hello(conn):
  hello = """
            <?xml version="1.0" encoding="UTF-8" standalone="no"?>
            <epp xmlns="urn:ietf:params:xml:ns:epp-1.0">
              <hello/>
            </epp>
          """

  print hello
  conn.send(hello)
  print receive(conn)
  print "\n"

def login(conn):
  login_com = """
    <?xml version="1.0" encoding="UTF-8" standalone="no"?>
      <epp xmlns="urn:ietf:params:xml:ns:epp-1.0">
        <command>
          <login>
            <clID>""" + clID + """</clID>
            <pw>""" + pw + """</pw>
            <options>
              <version>1.0</version>
              <lang>en</lang>
            </options>
            <svcs>
              <objURI>urn:ietf:params:xml:ns:domain-1.0</objURI>
              <objURI>urn:ietf:params:xml:ns:contact-1.0</objURI>
              <objURI>urn:ietf:params:xml:ns:secDNS-1.1</objURI>
              <objURI>http://www.dir.org/xsd/account-1.0</objURI>
              <objURI>http://www.dir.org/xsd/future-1.0</objURI>
            </svcs>
          </login>
        <clTRID>""" + clTRID + """</clTRID>
        </command>
      </epp>
    """

  print login_com
  send_(login_com,conn)
  # conn.send(login_com)
  print receive(conn)
  print "\n"

def create(conn):
  create = """
    <?xml version="1.0" encoding="UTF-8"?>
    <epp xmlns="urn:ietf:params:xml:ns:epp-1.0"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xsi:schemaLocation="urn:ietf:params:xml:ns:epp-1.0
    epp-1.0.xsd">
      <command>
        <create>
        <domain:create xmlns:domain="urn:ietf:params:xml:ns:domain-1.0"
        xsi:schemaLocation="urn:ietf:params:xml:ns:domain-1.0
        domain-1.0.xsd">
          <domain:name>""" + testDomain + """</domain:name>
            <domain:period unit="y">""" + years + """</domain:period>
            <domain:registrant>""" + clID + """</domain:registrant>
            <domain:authInfo>
              <domain:pw>""" + pw + """</domain:pw>
            </domain:authInfo>
        </domain:create>
        </create>
        <clTRID>""" + clTRID + """</clTRID>
      </command>
    </epp>
  """

  # create2 = """
  #   <?xml version="1.0" encoding="UTF-8"?>
  #   <epp xmlns="urn:ietf:params:xml:ns:epp-1.0"
  #   xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  #   xsi:schemaLocation="urn:ietf:params:xml:ns:epp-1.0
  #   epp-1.0.xsd">
  #     <command>
  #       <create>
  #       <domain:create
  #       xmlns:domain="urn:ietf:params:xml:ns:domain-1.0"
  #       xsi:schemaLocation="urn:ietf:params:xml:ns:domain-1.0
  #       domain-1.0.xsd">
  #         <domain:name>nominet-test100.co.uk</domain:name>
  #           <domain:period unit="y">2</domain:period>
  #           <domain:ns>
  #             <domain:hostObj>ns1.nominet.org.uk</domain:hostObj>
  #             <domain:hostObj>ns2.nominet.org.uk</domain:hostObj>
  #           </domain:ns>
  #           <domain:registrant>ab-c123456</domain:registrant>
  #           <domain:authInfo>
  #           <domain:pw>**********</domain:pw>
  #         </domain:authInfo>
  #       </domain:create>
  #       </create>
  #       <clTRID>""" + clTRID + """</clTRID>
  #     </command>
  #   </epp>
  # """

  print create
  send_(create,conn)
  # conn.send(login_com)
  print receive(conn)
  print "\n"

def receive(conn):
  # Read first four bytes to retreive message length.
  length = conn.recv(4)
  if length:
    # unpack() returns a one-element tuple.
    msg_length = struct.unpack(">I", length)[0] - 4
    received = b""
    while msg_length > len(received):
      chunk = conn.recv(4096)
      if chunk == b"":
        break
        # raise RuntimeError("socket connection broken")
      received += chunk
    return received

def send_(msg, conn):
  length = struct.pack(">I", len(msg) + 4 + 2)
  # Why "\r\n" has to be sent? Otherwise an connection error will occur.
  msg = msg.encode("utf-8") + b"\r\n"
  conn.sendall(length)
  conn.sendall(msg)

try:
  #conn.connect((HOST, PORT))
  sock.connect(('ote.nic.io', 700))
  print "\n<===== Greeting =======>\n"
  print sock.recv()
  print "\n<===== Greeting Finished =======>\n"
  login(sock)
  create(sock)
finally:
  sock.close()

#
# login()
# hello()
#
# sock.close()
