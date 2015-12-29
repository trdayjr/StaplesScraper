import os, subprocess

APP_ROOT = os.path.dirname(os.path.realpath(__file__))
CASPER = '/Projects/CasperJs/bin/casperjs'
SCRIPT = os.path.join(APP_ROOT,'Staples.js')

params = CASPER + ' ' + SCRIPT #+ ' --cookies-file=cookies.txt'

print(subprocess.check_output(params, shell=True))
