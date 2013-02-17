# Retrieve a listing of all slide decks
index_files=`find . -regextype posix-egrep -regex './[0-9]{4}/[^/]+/index.html$' -type f`

for f in $index_files; do
	title=`grep --no-filename --only-matching -E "<title>[^<]+</title>" $f`
	title=`echo $title | sed 's/<[^>]\+>//g'`
	# Remove my name, if present
	title=`echo $title | sed 's/[[:space:]-]*\(mike\|michael\)[[:space:]]*pennisi\?[[:space:]-]*//gI'`

	date=`grep --no-filename --only-matching -E "<meta [^>]*name=[\"']DC\.created[\"'] [^>]*>" $f`
	date=`echo $date | sed 's/^.*\([0-9]\{4\}-[0-9]\{2\}-[0-9]\{2\}\).*/\1/'`

	echo "---\ntitle: $title\ndate: $date\n---" | cat - $f | tee $f
done
