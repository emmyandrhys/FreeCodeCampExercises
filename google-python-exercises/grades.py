def arithmetic_arranger(problems):
  #variable for total space taken by problems
  prob_space = 0
  num_probs = len(problems)
  problist = [ []*7 for x in range(num_probs)]

  #check if there are too many problems (>5)
  if len(problems) > 5:
    return "Error: Too many problems."
  temp = 0

  # check that all problems are addition or subtraction
  for problem in problems:
    if problem.find('+') == -1 and problem.find('-') == -1:
      return "Error: Operator must be '+' or '-'."

    # split each problem element into a 3 part tuple
    #if problem.count("+") == 1:
      #problem = problem.partition("+")
      #problist[temp][1] = "+"
    #if problem.count("-") == 1:
      #problem = problem.partition("-")
      #problist[temp][1] = 0
    problist[temp] = problem.split()
    temp += 1
  temp = 0
  for problem in problist:
    # get the int for each addend
    problist[temp][0] = int(problist[temp][0])
    problist[temp][2] = int(problist[temp][2])
    #get the sum or difference for each problem
    if problist[temp][1] == "+":
      problist[temp][6] = problist[temp][0] + problist[temp][2]
    if problist[temp][1] == "-":
      problist[temp][6] = problist[temp][0] - problist[temp][2]
    temp += 1

  #turn 2nd line into string with operator
  for problem in problist:
    a = len(str(problem[0]))
    b = len(str(problem[2])) + 2
    if a < b:
      problem[3] = (b - a) * "\s" + str(problem[0])
      problem[5] = b * "-"
      prob_space = b + prob_space
      if problem[1] == 1:
        problem[4] = "+\s" + str(problem[2])
      elif problem[1] == 0:
        problem[4] = "-\s" + str(problem[2])
    elif a == b:
      problem[3] = 2 * "\s" + str(problem[0])
      problem[5] = b * "-"
      prob_space = b + prob_space
      if problem[1] == 1:
        problem[4] = "+\s" + str(problem[2])
      if problem[1] == 0:
        problem[4] = "-\s" + str(problem[2])
    elif a > b:
      problem[3] = 2 * "\s" + str(problem[0])
      problem[5] = (a + 2) * "-"
      prob_space = a + 2 + prob_space
      if problem[1] == 1:
        problem[4] = "+" + (a - b + 1) * "\s" + str(problem[2])
      elif problem[1] == 0:
        problem[4] = "-" + (a - b + 1)* "\s" + str(problem[2])

  for prob in problist:
    prob_space = prob_space + len(prob[5])
  white_space = int((60 - prob_space) // (num_probs - 1)) * '\s'
  top, bottom, line = '', '', ''
  i, space, answer, answers = 0, 0, 0, 0
  while i < num_probs:
    top = top + problist[i][3] + white_space
    bottom = bottom + problist[i][4] + white_space
    line = line + problem[5] + white_space
    space = (len(problist[i][5]) - len(str(problist[i][6]))) * '\s'
    answer = space + str(problist[i][6])
    answers = answers + answer + white_space
    i += 1
  final = top + "\n" + bottom + "\n" + line
  final_answers = final + '\n' + answers

  return final
