export const store = {
  debug: false,
  state: {
    nextNotificationId: 0,
    notifications: [] // {id: 0, text: "This is a notification"}
  },
  sendNotification({ title, html }) {
    if (this.debug) console.log("[store] sendNotification:", { title, html });
    this.state.notifications.push({
      id: this.state.nextNotificationId++,
      title,
      html
    });
  },
  sendCopyNotification(text) {
    this.sendNotification({
      title: "Copied to clipboard",
      html: `<span class="pre">${text}</span>`
    });
  },
  removeNotification(notification) {
    if (this.debug) console.log("[store] removeNotification:", notification);
    const idx = this.state.notifications.findIndex(
      (n) => n.id === notification.id
    );
    this.state.notifications.splice(idx, 1);
  }
};
