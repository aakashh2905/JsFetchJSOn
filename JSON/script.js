// Fetch JSON data from file
fetch('data.json')
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(jsonData => {
        const uniqueData = removeDuplicates(jsonData, 'stock_symbol');

        document.getElementById('tableForm').addEventListener('submit', function(event) {
            event.preventDefault();
            const numRows = parseInt(document.getElementById('numRows').value);
            const numCols = parseInt(document.getElementById('numCols').value);

            createTable(numRows, numCols);
        });

        document.getElementById('deleteTableButton').addEventListener('click', function() {
            const table = document.getElementById('myTable');
            table.style.display = 'none';
            document.getElementById('deleteTableButton').style.display = 'none';
        });

 
        function removeDuplicates(data, uniqueKey) {
            const map = new Map();
            data.forEach(item => map.set(item[uniqueKey], item));
            return Array.from(map.values());
        }

     
        function createTable(rows, cols) {
            const table = document.getElementById('myTable');
            const thead = document.getElementById('tableHeader');
            const tbody = document.getElementById('tableBody');

            thead.innerHTML = '';
            tbody.innerHTML = '';

            const headers = Object.keys(uniqueData[0]);
            
            const headerRow = document.createElement('tr');
            headers.slice(0, cols).forEach(header => {
                const th = document.createElement('th');
                th.textContent = header.replace(/_/g, ' ').toUpperCase(); // Replace underscores with spaces and capitalize
                headerRow.appendChild(th);
            });
            thead.appendChild(headerRow);
            const numRowsToDisplay = Math.min(rows, uniqueData.length);

            for (let i = 0; i < numRowsToDisplay; i++) {
                const row = uniqueData[i]; 
                const tr = document.createElement('tr');
                headers.slice(0, cols).forEach(header => {
                    const td = document.createElement('td');
                    td.textContent = row[header] !== undefined ? row[header] : '';
                    tr.appendChild(td);
                });
                tbody.appendChild(tr);
            }

            table.style.display = 'table';
            document.getElementById('deleteTableButton').style.display = 'inline';
        }
    })
    .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
    });
