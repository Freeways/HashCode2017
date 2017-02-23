


def read(filename):

	file = open("./in/"+filename+".in","r")
	conf = file.readline().replace("\n","").split(" ")
	V, E, R, C, X = int(conf[0]), int(conf[1]), int(conf[2]), int(conf[3]), int(conf[4])
	vSizes = file.readline().replace("\n","").split(" ")

	endpoints = []
	for index in range(E):
		eInfo = file.readline().replace("\n","").split(" ")
		Ld = int(eInfo[0])
		K = int(eInfo[1])
		connections = []
		for i in range(K):
			cInfo = file.readline().replace("\n","").split(" ")
			connections.append({'c': int(cInfo[0]), 'Lc': int(cInfo[1]), 'quota': 0})

		# Sort connection by latency
		connections = sorted(connections, key = lambda cn: cn['Lc'])
		endpoints.append({'Ld': Ld, 'K': K, 'cnx': connections})	

	requests = []
	for index in range(R):
		cn = file.readline().replace("\n","").split(" ")
		requests.append({'Rv': int(cn[0]), 'Re': int(cn[1]), 'Rn': int(cn[2]), 'size': int(vSizes[int(cn[0])])})

	# Sort Video by nb req
	requests = sorted(requests, key = lambda req: (req['size'], req['Rn']))

	file.close()

	return V, E, R, C, X, vSizes, endpoints, requests