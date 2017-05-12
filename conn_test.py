import pycurl

curl = pycurl.Curl()
curl.setopt(pycurl.SSLCERT, "./cacert.pem")
curl.setopt(pycurl.SSLKEY, "./occasio.key")
curl.setopt(pycurl.CAINFO, "./root.pem")
curl.setopt(pycurl.SSL_VERIFYPEER, 1)
curl.setopt(pycurl.SSL_VERIFYHOST, 2)
curl.setopt(pycurl.URL, "https://google.com/")

curl.perform()