
from hash_modules import hash_input, hash_output
from numpy import zeros

#def getEP():


files = [
	{'name':"kittens"},
]

for f in files:
	V, E, R, C, X, vSizes, endpoints, requests = hash_input.read(f['name'])
	
	cache = []
	for c in range(C):
		cache.append([])

	quota = zeros(C)

	max = X*C

	i = 0
	maxIt = 10
	
	while quota.sum() < max and i < maxIt:
		print "|||||||||||||||||||||||| ITERATION ", i
		for req in requests:

			# Remove cache servers with filled quota
			"""for x in endpoints[req['Re']]['cnx']:
				if quota[x['c']] > X :
					endpoints[req['Re']]['cnx'].remove(x)
			"""
			ePoint = endpoints[req['Re']]

			bestCn = -1
			
			for cn in ePoint['cnx']:
				if ((quota[cn['c']] + req['size']) <= X) and (req['Rv'] not in cache[cn['c']]):
					bestCn = cn['c']
					quota[cn['c']] += req['size']
					break

			if bestCn == -1:
				continue

			cache[bestCn].append(req['Rv'])

		i += 1


	
	hash_output.write(cache, C, f['name'])