import csv

def write(cache, C, file):

	results = []
	for i in range(C):
		results.append([i]+cache[i])

	results=[[len(results)]] + results

	export_file = 'out/' + file + '.out'

	with open(export_file, 'w') as fp :
		a = csv.writer(fp, delimiter=' ')
		a.writerows(results)