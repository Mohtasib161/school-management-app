export const updatePassword = async () => {
    try {
        // Hash the plaintext password
        const hashedPassword = await bcrypt.hash("Lahore@007", 10);

        // Update the password in the database
        await query("UPDATE admin SET password = $1 WHERE email = $2", [hashedPassword, "admin007@gmail.com"]);
        console.log("Password has been hashed and updated in the database.");
    } catch (error) {
        console.error("Error updating password:", error);
    }
};
