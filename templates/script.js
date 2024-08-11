
function searchTweets() {
    const query = document.getElementById('search-query').value;
    $.get(`/search?query=${query}`, function (data) {
        $('#tweets-table').DataTable().clear().rows.add(data).draw();

        // Example for Likes Chart
        const likesData = data.map(tweet => tweet.likes);
        const labels = data.map(tweet => tweet.username);
        const ctx = document.getElementById('likesChart').getContext('2d');
        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Likes',
                    data: likesData,
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });

        // Example for Retweets Chart
        const retweetsData = data.map(tweet => tweet.retweets);
        const ctx2 = document.getElementById('retweetsChart').getContext('2d');
        new Chart(ctx2, {
            type: 'pie',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Retweets',
                    data: retweetsData,
                    backgroundColor: ['rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(255, 206, 86, 0.2)', 'rgba(75, 192, 192, 0.2)'],
                    borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)', 'rgba(75, 192, 192, 1)'],
                    borderWidth: 1
                }]
            }
        });
    });
}

$(document).ready(function () {
    $('#tweets-table').DataTable();
});
