async function removeFromCart(eventId) {
   await fetch(`/events/${eventId}/cart`, {
      method: "DELETE",
   });
   window.location.reload();
}

document.addEventListener("DOMContentLoaded", () => {
   var deleteButtons = document.querySelectorAll(".deleteButton");

   for (var button of deleteButtons) {
      button.addEventListener("click", (event) => {
         const clickedButton = event.currentTarget;
         const eventId = clickedButton.dataset.eventid;
         removeFromCart(eventId);
      });
   }
});
