# Fee Follow-up Dashboard — Rationale

## 1. Visual hierarchy

**Promoted:** Outstanding amount, accounts needing action, urgent cases, and search. These are the decisions Lakshmi needs within the first few seconds.

**Demoted:** Payment history, notes, phone numbers, and fee-component details. They are available in the drawer when a row is investigated.

---

## 2. Three awkward records

* **Credit balance → “Credit”** (green badge, excluded from outstanding total).
* **Instalment plan → “Instalment”** (visible but not treated as delinquent).
* **Bounced cheque → “Bounced”** (warning badge with alternate-payment follow-up).

I also marked sibling accounts with **“Chase family once”** to avoid duplicate reminders.

---

## 3. Interaction path (bulk follow-up)

1. Select all visible — **1 click**
2. Queue WhatsApp reminders — **1 click**
3. Confirm — **1 click**

**Total: 3 clicks** from opening the dashboard to queuing reminders for the visible defaulters.

---

## 4. Mobile decisions

**Kept:** Student name, class, status badge, amount due, overdue days, and payment-history access.

**Dropped:** Table layout, detailed notes, reminder metadata, and fee-component breakdowns.

I used stacked cards so the amount due remains readable on a phone-sized screen.

---

## 5. One thing I rejected

I initially showed full fee-component details in each table row. It reduced scan speed and distracted from the overdue amount, so I moved those details into the payment-history drawer.

---

## Technical note

State management remains in `App.tsx`, while large UI sections were extracted into reusable components (`StudentTable`, `MobileCards`, `BulkActionBar`, `ReminderModal`, and `PaymentHistoryDrawer`) for readability and maintainability.
