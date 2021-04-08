import $ from 'jquery';
import endpoint from './endpoint';

export default function getSuggestion(userId) {
    return new Promise((resolve) => {
        $.ajax({
            url: endpoint + "?user=" + userId,
            contentType: "application/json",
            dataType: "json",
            success: function(suggestions) {
                resolve(suggestions);
            }
        });
    });
}