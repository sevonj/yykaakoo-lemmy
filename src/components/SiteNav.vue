<template>

    <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/messages">Messages</RouterLink>
        <RouterLink to="/profile">Profile</RouterLink>
        <RouterLink to="/settings">Settings</RouterLink>
        <RouterLink to="/about">About</RouterLink>
    </nav>

</template>


<style scoped>
nav {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: larger;
    flex-grow: 0;
}


.router-link-active {
    color: black;
    background-color: orange;
}
</style>
