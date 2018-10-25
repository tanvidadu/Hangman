import pandas as pd
import json
import sys
from pprint import pprint

unigramData = pd.read_csv('unigramLetterData.csv')

bigramData = None

with open('bigramFiles/bigrams.json') as json_data:
    d = json.load(json_data)
    bigramData = pd.DataFrame.from_dict(d)
bigramData.head()

bigramData.columns = ['Bigram', 'Percentage']
total_freq = bigramData['Percentage'].sum()
bigramData['Percentage'] = (bigramData['Percentage']/float(total_freq))*100
bigramData.head()

word = raw_input()
print(word)
guess_word_list = []
last_guessed_letter = '*'
penalty = 0
guess_word = "*" * len(word)

def replaceLetter(word, guess_word, letter,):
    new_word = ""
    for i in range(len(word)):
        if word[i] == letter:
            new_word += letter
        elif guess_word[i].isalpha() == True:
            new_word += word[i]
        else:
            new_word += "*"
    return new_word

def guessLetter( word, guess_word, letter):
    if letter in word:
        guess_word = replaceLetter(word,guess_word, letter)
    return guess_word

def guess_first_letter(word, guess_word, penalty):
    for i in range(26):
        new_word = guessLetter(word, guess_word, unigramData['Letter'].iloc[i].lower())
        if new_word != guess_word:
            guess_word_list.append(unigramData['Letter'].iloc[i].lower())
            last_guessed_letter = unigramData['Letter'].iloc[i].lower()
            return (new_word, penalty, last_guessed_letter)
        else:
            penalty += 1

def getString( string, letter):
    if string[0] == letter:
        return 'L'
    elif string[1] == letter:
        return 'R'
    else:
        return 'X'

def maxProbBigram(letter):
    bigram_dict = bigramData['Bigram'].apply(lambda x: getString(x, letter))
    left_letter_data = bigramData[(bigram_dict == 'L')]
    right_letter_data = bigramData[(bigram_dict == 'R')]
    return (left_letter_data, right_letter_data)

def guessLetterHelper(word, guess_word, letter,penalty):
    (left_letter_data, right_letter_data) = maxProbBigram(letter)
    left_counter = 0
    right_counter = 0
    while(1):
        left_letter = left_letter_data.iloc[left_counter, :]
        right_letter = right_letter_data.iloc[right_counter, :]
        if left_letter['Percentage'] > right_letter['Percentage']:
            if left_letter['Bigram'][1] not in guess_word_list:
                new_word = guessLetter(word, guess_word, left_letter['Bigram'][1])
                guess_word_list.append(left_letter['Bigram'][1])
                if new_word != guess_word:
                    last_guessed_letter = left_letter['Bigram'][1]
                    return (new_word, penalty, last_guessed_letter)
                else:
                    left_counter += 1
                    penalty += 1
            else:
                left_counter += 1
        else:
            if right_letter['Bigram'][1] not in guess_word_list:
                new_word = guessLetter(word, guess_word, right_letter['Bigram'][0])
                guess_word_list.append(right_letter['Bigram'][0])
                if new_word != guess_word:
                    last_guessed_letter = right_letter['Bigram'][0]
                    return (new_word, penalty, last_guessed_letter)
                else:
                    right_counter += 1
                    penalty += 1
            else:
                right_counter += 1

(guess_word, penalty, last_guessed_letter) = guess_first_letter(word, guess_word, penalty)
print guess_word
print guess_word_list
print penalty
print last_guessed_letter
while( word != guess_word):
    (guess_word, penalty, last_guessed_letter) = guessLetterHelper(word, guess_word,last_guessed_letter, penalty)
    print guess_word
    print guess_word_list
    print penalty
    print last_guessed_letter
