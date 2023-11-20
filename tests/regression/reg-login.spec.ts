import { test, expect } from '@playwright/test'
import AccountGenerator from '/home/othmane.bajaddi/repos-perso/lumapw/utils/account-generator'

test.describe('Login & logout flow', () => {
    test.beforeEach(async ({ page }) => {
      page.on('console', (msg) => {
        console.log(msg);
      });
      await page.goto('/');
    });
    // Here we can only create temporary accounts
    test('Create an account', async ({ page }) => {
      console.log(AccountGenerator.newAccountPassword) 
      await page.getByRole('link', { name: 'Create an Account' }).click()
      await page.locator('#firstname').fill(AccountGenerator.randomFirstname)
      await page.locator('#lastname').fill(AccountGenerator.randomLastName)
      await page.locator('#email_address').fill(AccountGenerator.newAccountEmail)
      await page.locator('#password').fill(AccountGenerator.newAccountPassword)
      await page.locator('#password-confirmation').fill(AccountGenerator.newAccountPassword)
      await page.getByRole('button', { name: 'Create an Account' }).click()
      await expect(page.locator("div[role='alert']").first()).toContainText('Thank you for registering')
      await expect(page.getByText(`${AccountGenerator.randomFirstname} ${AccountGenerator.randomLastName} ${AccountGenerator.newAccountEmail}`)).toBeVisible()
    });

    test('Login - Positive scenario', async ({ page }) => {
      await page.getByRole('link', { name: 'Sign In' }).click()
      await page.locator('#email').fill(AccountGenerator.newAccountEmail)
      await page.locator('#pass').fill(AccountGenerator.newAccountPassword)
      await page.locator('#send2').click()
      await expect(page.getByRole('banner').getByText(`Welcome, ${AccountGenerator.randomFirstname} ${AccountGenerator.randomLastName}`)).toBeVisible()
      // await page.waitForTimeout(2000)
    });
  
    test('Login - Negative scenario', async ({ page }) => {
      await page.getByRole('link', { name: 'Sign In' }).click()
      await page.locator('#email').fill(AccountGenerator.newAccountEmail)
      await page.locator('#pass').fill('Wrong_Passw0rd')
      await page.locator('#send2').click()
      await expect(page.locator("div[role='alert']").first()).toContainText('incorrect')
    });

});